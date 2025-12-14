function makeTile(ch){
  const a = document.createElement("a");
  a.className = "tile";
  a.href = `./challenge.html?id=${encodeURIComponent(ch.id)}`;
  a.innerHTML = `
    <div class="tag"># ${ch.topic}</div>
    <div class="name">${ch.title}</div>
    <div class="desc">${ch.subtitle}</div>
  `;
  return a;
}

const basicsBox = document.getElementById("basics");
const projectsBox = document.getElementById("projects");

CHALLENGES.forEach(ch => {
  const tile = makeTile(ch);
  if (ch.group === "basics") basicsBox.appendChild(tile);
  else projectsBox.appendChild(tile);
});
