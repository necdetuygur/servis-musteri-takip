window.addEventListener("load", () => {
  window.LIST = DB("LIST") || [];
  window.TIMER = setInterval(Reload, 1e3);
  window.MAX_NUMBER = window.LIST.length;
  Reload();
  document.querySelector(".container").style.opacity = 1;
});

const DB = (key, value) => {
  if (value) localStorage.setItem(key, JSON.stringify(value));
  return JSON.parse(localStorage.getItem(key));
};

const GetMaxNumber = () => {
  window.MAX_NUMBER = Math.max(window.MAX_NUMBER, window.LIST.length) + 1;
  return window.MAX_NUMBER;
};

const New = () => {
  const id = new Date().getTime() + ~~(Math.random() * 999 + 1000);
  const name = GetMaxNumber();
  const come = new Date().getTime();
  window.LIST.push({
    id,
    name,
    come,
    service: 0,
    leave: 0,
  });
  DB("LIST", window.LIST);
  Reload();
};

const Reload = () => {
  document.querySelector("#list").innerHTML = "";
  if (window.LIST.length < 1)
    document.querySelector("#list").innerHTML =
      '<tr><td colspan=9>Hiç müşteri yok. "Yeni Müşteri" butonuna basarak, yeni müşteri ekleyebilirsiniz.</td></tr>';
  window.LIST.forEach((item) => {
    document.querySelector("#list").innerHTML += `
      <tr>
        <td class="lh80 rank">${item.name}</td>
        <td class="center">
          <div class="mono">${Time(item.come)}</div>
          <div>
            <button class="btn custom-btn btn-primary" onclick="Update(${
              item.id
            }, 'come')">Başlat</button>
          </div>
        </td>
        <td class="center">
          <div class="mono">${Time(item.service)}</div>
          <div>
            <button class="btn custom-btn btn-primary" onclick="Update(${
              item.id
            }, 'service')">Başlat</button>
          </div>
        </td>
        <td class="center">
          <div class="mono">${Time(item.leave)}</div>
          <div>
            <button class="btn custom-btn btn-primary" onclick="Update(${
              item.id
            }, 'leave')">Başlat</button>
          </div>
        </td>
        <td class="lh80">
          <button class="btn custom-btn btn-danger" onclick="Remove(${
            item.id
          })">Sil</button>
        </td>
      </tr>
    `;
  });
};

const Time = (mt) => {
  if (mt == "0") return "00:00:00";
  const time = new Date(new Date().getTime() - mt);
  return `
    ${("00" + time.getUTCHours()).slice(-2)}:
    ${("00" + time.getUTCMinutes()).slice(-2)}:
    ${("00" + time.getUTCSeconds()).slice(-2)}
  `
    .replace(/[\ \n]/gi, "")
    .trim();
};

const Update = (id, type) => {
  window.LIST.find((item) => item.id == id)[type] = new Date().getTime();
  DB("LIST", window.LIST);
  Reload();
};

const Remove = (id) => {
  window.LIST = window.LIST.filter((item) => item.id != id);
  DB("LIST", window.LIST);
  Reload();
};
