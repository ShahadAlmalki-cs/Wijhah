export default async function run(page, ui) {
  const errs = [];
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message.slice(0, 300)));

  await page.goto('http://127.0.0.1:8123/OrderPage.html', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#buildingSelect', { timeout: 10000 });
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#buildingSelect', { timeout: 10000 });
  await page.waitForTimeout(1000);

  const audit = await page.evaluate(() => {
    const sel = document.getElementById('buildingSelect');
    const field = sel.closest('.field');
    const hint = document.getElementById('feeHint');

    // Every child node of the .field wrapper, with its type and any text.
    const children = field ? Array.from(field.childNodes).map((n) => ({
      nodeType: n.nodeType,
      nodeName: n.nodeName,
      text: (n.textContent || '').trim().slice(0, 50),
      tag: n.tagName || null,
      id: n.id || null,
      cls: n.className ? String(n.className).slice(0, 30) : null,
    })) : null;

    // Sibling elements AFTER the select inside .field (a likely artifact spot).
    const after = [];
    if (field) {
      const kids = Array.from(field.children);
      const idx = kids.indexOf(sel);
      for (let i = idx + 1; i < kids.length; i += 1) {
        const el = kids[i];
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        after.push({
          tag: el.tagName, id: el.id || null, cls: String(el.className || '').slice(0, 30),
          w: Math.round(r.width), h: Math.round(r.height),
          border: cs.border, textDecoration: cs.textDecorationLine,
          bgImage: cs.backgroundImage === 'none' ? 'none' : 'HAS-IMAGE',
          text: el.innerText.trim().slice(0, 60),
        });
      }
    }

    // Look for ANY element in the form carrying a wavy/underline decoration.
    const wavy = [];
    document.querySelectorAll('.order-form, .order-form *').forEach((el) => {
      const cs = getComputedStyle(el);
      const deco = cs.textDecorationLine + ' + cs.textDecorationStyle + ' + cs.borderStyle;
      if (/wavy|underline|dashed|dotted/.test(deco)) {
        wavy.push({
          tag: el.tagName, id: el.id || null, cls: String(el.className || '').slice(0, 30),
          textDecorationLine: cs.textDecorationLine,
          textDecorationStyle: cs.textDecorationStyle,
          borderStyle: cs.borderStyle,
          text: (el.innerText || '').trim().slice(0, 40),
        });
      }
    });

    // Sizes to confirm the select itself is clean.
    const cs = getComputedStyle(sel);
    const r = sel.getBoundingClientRect();
    return {
      select: {
        outerHTMLStart: sel.outerHTML.slice(0, 120),
        optionCount: sel.options.length,
        w: Math.round(r.width), h: Math.round(r.height),
        border: cs.border,
        borderRadius: cs.borderRadius,
        backgroundImage: cs.backgroundImage === 'none' ? 'none' : cs.backgroundImage.slice(0, 70),
        backgroundSize: cs.backgroundSize,
        backgroundPosition: cs.backgroundPosition,
        paddingRight: cs.paddingRight,
        paddingLeft: cs.paddingLeft,
        textDecoration: cs.textDecorationLine,
      },
      fieldChildren: children,
      elementsAfterSelect: after,
      hintText: hint ? hint.innerText.trim() : null,
      hintBorder: hint ? getComputedStyle(hint).borderStyle : null,
      hintDecoration: hint ? getComputedStyle(hint).textDecorationLine : null,
      wavyElements: wavy,
      // Order-notes section: how many labels and textareas?
      notesSection: (() => {
        const sec = document.querySelectorAll('.form-section')[2];
        if (!sec) return null;
        return {
          labels: sec.querySelectorAll('label').length,
          labelTexts: Array.from(sec.querySelectorAll('label')).map((l) => l.innerText.trim()),
          textareas: sec.querySelectorAll('textarea').length,
          textareaPlaceholder: sec.querySelector('textarea') ? sec.querySelector('textarea').placeholder : null,
          textareaBorder: sec.querySelector('textarea') ? getComputedStyle(sec.querySelector('textarea')).borderStyle : null,
          html: sec.innerHTML.split(/\s+/).join(' ').slice(0, 500),
        };
      })(),
    };
  });

  // Screenshot the artifact region: section 02 + 03
  await page.locator('.order-form').screenshot({ path: 'shot_form_full.png' });
  await page.locator('.form-section').nth(1).screenshot({ path: 'shot_section02.png' });
  await page.locator('.form-section').nth(2).screenshot({ path: 'shot_section03.png' });

  audit.consoleErrors = errs;
  return audit;
}
