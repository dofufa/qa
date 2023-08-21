const arr = [];
const d = document;

// collect <a> and <img> elements
const q = d.querySelectorAll('a');
const r = d.querySelectorAll('img');

// TODO: change .forEach to .filter

// sift <a> elements
q.forEach( (a) => {
    const m = ( !!a.href.match(document.location.host) 
      && (a.href.endsWith('pdf') || a.href.endsWith('png')) )
    m ? arr.push(a.href) : false;
});

// sift <img> elements
r.forEach( (i) => {
    const m = ( !!i.src.match(document.location.host) 
      && ( i.src.indexOf('t250') > -1 && i.src.endsWith('png')) )
    m ? arr.push(i.src) : false;
});

// create array of unique image URLs
const uniq = [...new Set(arr)];


// convert image URLs to 'image:image' items
const items = [];
uniq.forEach( (u) => {
  items.push(`
    <image:image>
    <image:loc>
      ${u}
    </image:loc>
  </image:image>
  `);

});

// place 'image:image' items into XML template
const data = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
<url>
  <loc>
    ${window.location.href}
  </loc>
  ${items.join('\n')}
</url>
</urlset>
`.trim();

// XML file export
// based on solution found here:
// https://stackoverflow.com/q/70107063

const blob = new Blob([data], {type: "text/xml"});
const re = /\/(\w+)\.html/;
const tag = document.location.pathname.match(re)[1];
const fn = `${tag}.xml`;

const el= document.createElement('a');
el.href = window.URL.createObjectURL(blob);
el.download = fn;
el.click();
window.URL.revokeObjectURL(el.href);
