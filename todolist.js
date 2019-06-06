window.addEventListener("load",function () {
    let tab=document.querySelectorAll(".tab>li");
    let content=document.querySelector(".content")
    let prev=0;
    let type="all";
    let todolist=[
        {
            id:1, content:"留言页面", ctime:"2019/6/4", status:false
        },
        {
            id:2, content:"文档", ctime:"2019/6/10", status:false
        },
        {
            id:3, content:"water", ctime:"2019/6/10", status:false
        },
        {
            id:4, content:"博客", ctime:"2019/5/31", status:true
        }
    ];

    let str=localStorage.getItem("todolist");
    if(!str){
        saveDate();
        str=localStorage.getItem("todolist");
    }
    todolist=JSON.parse(str)
    console.log(todolist);

    tab.forEach(function (elem,index) {
         elem.onclick=function () {
            tab[prev].classList.remove("hot");
            this.classList.add("hot");
            prev=index;
            type=this.getAttribute("type");

             saveDate();
             render(filterDate(type));

          }
     });
     tab[0].onclick();
     content.onclick=function (e) {
         let target=e.target;
         let id=target.parentNode.id;
         if(target.nodeName==="INPUT"){
             let ele=todolist.filter(ele=>ele.id==id)[0];
             ele.status=target.checked;
         }else if(target.nodeName==="DEL"){
             let index=todolist.findIndex(ele=>ele.id==id);
             todolist.splice(index,1);
         }
         saveDate();
         render(filterDate(type));

     }
     let form=document.myform;

    let textBtn=form.elements[1];
     let subBtn=form.elements[0];
     subBtn.onclick=function (e) {
         e.preventDefault();
         if(textBtn.value){
             let obj=addObj();
             todolist.push(obj);
             form.reset();
             saveDate();
             render(filterDate(type));

         }
         else{
             alert("内容不能为空");
         }
     }
     function saveDate() {
         localStorage.setItem("todolist",JSON.stringify(todolist))
     }
     function addObj() {
         let id=todolist[todolist.length-1].id+1;
         let content=textBtn.value;
         let ctime=new Date().toLocaleDateString();
         let status=false;
         return {id,content,ctime,status};
     }





     function filterDate(type) {
         let arr=[];
         switch (type) {
             case "all":
                 arr=todolist;
                 break;
             case "done":
                 arr=todolist.filter(function (elem) {
                     return elem.status;
                 })
                 break;
             case "doing":
                 arr=todolist.filter(elem=>!elem.status);
                 break;
         }
         return arr;
     }

    //渲染列表
    // render(todolist)
    function render(arr) {
        let html="";
        arr.forEach(function (elem,index) {
            if(elem.status){
                html+=`
                    <li id="${elem.id}">
                        <input type="checkbox" checked>
                        <p>${elem.content}</p>
                        <del>X</del>
                        <span>${elem.ctime}</span>
                    </li>
                `;
            }
            else{
                html+=`
                    <li id="${elem.id}">
                        <input type="checkbox" >
                        <p>${elem.content}</p>
                        <del>X</del>
                        <span>${elem.ctime}</span>
                    </li>
                `;
            }
        })
        content.innerHTML=html;
    }
})