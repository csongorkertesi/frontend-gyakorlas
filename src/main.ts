import content from './content.json' assert { type: 'json' };

const nav = document.querySelector('.page nav');
const main = document.querySelector('.page main');
const header = document.querySelector('.page h2');
const footer = document.querySelector('.page footer');
const p = document.querySelector('.page p');
const title = document.querySelector('title');


let currentIndex = 0;
function updateContent(index: number) {
    const page = content[index];
    if (main) main.innerHTML = page.content;
    if (header) header.innerHTML = page.title || '';
    if (footer) footer.innerHTML = page.footer || '';
    if (title) title.innerText = page.title;
    if (page.company && title) { title.innerText = `${page.company} | ${page.title}`; }
    else if (title) { title.innerText = `SuperCompany Ltd. | ${page.title}`; }
    if (p) p.innerHTML = `${index == 0 ? '' : `<a id="prev" href="#" onclick="nav(${(index - 1 + content.length) % content.length})">&lt;&lt; Prev</a>`}&nbsp;&nbsp;${index == content.length - 1 ? '' : `<a id="next" href="#" onclick="nav(${(index + 1) % content.length})">Next &gt;&gt;</a>`}`;
    document.documentElement.lang = page.language || 'en';
    currentIndex = index;
    if (nav) {
        nav.querySelectorAll('a').forEach((a, i) => {
            if (i === index) {
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        });
    }
}

content.forEach((page, index) => {
    const a = document.createElement('a');
    a.href = '#';
    a.innerText = page.title;
    a.addEventListener('click', (e) => {
        e.preventDefault();
        updateContent(index);
    });
    if (nav) {
        nav.appendChild(a);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    updateContent(0);
});

(window as any).nav = (index: number) => {
    updateContent(index);
};