async function createTable () {
    let tbdy = document.querySelector('tbody');
    tbdy.innerHTML=""
    let data = await getData()
    let newData = formatData(data)
    let tbl = document.querySelector('table');
   
    newData.forEach((elem)=>{
        let tr = document.createElement('tr');
        Object.values(elem).forEach((el,arr)=>{
            let td = document.createElement('td');
            let input = document.createElement("input")
            input.value = el
            if(el>=100){
              input.className="summ-up"
            }
            input.setAttribute("readonly","readonly")
            td.appendChild(input);
            tr.appendChild(td);
        })
        let edit = document.createElement("img")
        edit.setAttribute("src","./icons/icons8-редактировать.svg")
        let save = document.createElement("img")
        save.setAttribute("src","./icons/icons8-ок.svg")
        save.className= "hide"
        edit.addEventListener("click",()=>{editTable(edit,save)})
        save.addEventListener("click",()=>{saveTable(edit,save)})

        tr.appendChild(edit)
        tr.appendChild(save)
        let del = document.createElement("img")
        del.setAttribute("src","./icons/icons8-закрыть-окно-48.png")
        del.addEventListener("click",()=>{delRow(del.parentElement.firstChild.firstChild.value)})
        tr.appendChild(del)
        tbdy.appendChild(tr);   
    })
    tbl.appendChild(tbdy);
    return tbl;
    
  }
  



function editTable(edit,save){
  for (let i = 0; i < 6; i++) {
    if( edit.parentElement.children[i].firstChild.tagName === "INPUT" ){
      edit.parentElement.children[i].firstChild.removeAttribute("readonly")
    } 
  }
  edit.className="hide"
  save.className=""
}

function saveTable(edit,save){
  for (let i = 0; i < 6; i++) {
    if(save.parentElement.children[i].firstChild.tagName === "INPUT" ){
      save.parentElement.children[i].firstChild.setAttribute("readonly","readonly")
    } 
  }
  sendData(formatSendData(save.parentElement.children))
  edit.className=""
  save.className="hide"
}

function delRow(id){
  fetch('http://127.0.0.1:3000/ ', {
        method: 'POST', 
        mode:"no-cors",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:id}) 
      }).then(() => {
        createTable();
      })
      
}

 document.querySelector(".plus").addEventListener("click",addRow)

  function formatData(data){
      let newData=[];
       newData = data.map((elem)=>{
          return {
              id:elem.id,
              summ:elem.summ,
              currecy:elem.currecy ==="UAH"?"грн":"дол",
              userName:`${elem.name} ${elem.lastName}`,
              data:elem.time.split(" ")[0],
              time:elem.time.split(" ")[1], 
          }
      })
      return newData
  }
  function formatSendData(row){
    let obj  = {
  id:row[0].firstChild.value,
  summ:row[1].firstChild.value,
  currecy:row[2].firstChild.value ==="грн"?"UAH":"USD",
  name:row[3].firstChild.value.split(" ")[0],
  lastName:row[3].firstChild.value.split(" ")[1],
  time:row[4].firstChild.value + " " + row[5].firstChild.value
  }
   return obj

  
  }

function addRow(){
  let tbody = document.querySelector("tbody")
  let tr = document.createElement("tr")
  let edit = document.createElement("img")
  edit.setAttribute("src","./icons/icons8-редактировать.svg")
  let save = document.createElement("img")
  save.setAttribute("src","./icons/icons8-ок.svg")
  save.className= "hide"
  let del = document.createElement("img")
  del.setAttribute("src","./icons/icons8-закрыть-окно-48.png")
  del.addEventListener("click",()=>{delRow(del.parentElement.firstChild.firstChild.value)})
  edit.addEventListener("click",()=>{editTable(edit,save)})
  save.addEventListener("click",()=>{saveTable(edit,save)})
  for (let i = 0; i < 6; i++) {
    let input =  document.createElement("input")
    input.setAttribute("readonly","readonly")
    let td = document.createElement("td")
    td.appendChild(input)
    tr.appendChild(td)
  }
  tr.appendChild(edit)
  tr.appendChild(save)
  tr.appendChild(del)
  tbody.appendChild(tr)
}

function sendData(data){
  fetch('http://127.0.0.1:3000/ ', {
    method: 'POST', 
    mode:"no-cors",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  })
  
}

  function getData(){
    return fetch('http://127.0.0.1:3000/ ')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data
      });
    }
    
    createTable();