function save()
{
    let membername = document.getElementById("member-name").value;
    let memberinfo = document.getElementById("member-info").value;

    //console.log(membername,memberinfo);
//  xu li cho dep
    if(_.isEmpty(membername)){
        document.getElementById('require-pn').innerHTML = "Phải nhập tên thành viên";
    }

    if(memberinfo.length > 31){
        memberinfo = "";
        document.getElementById('require-pni').innerHTML = "Thông tin dưới 30 kí tự";
    }
//xu li luu
    if(memberinfo)
    {
        //let members = localStorage.getItem('members') ? JSON.parse(localStorage.getItem('members')): [];

        let members = localStorage.getItem('members') ? JSON.parse(localStorage.getItem('members')) : [];
        members.push({
           membername: membername,
           memberinfo: memberinfo, 
        }) //tao doi tuong

        localStorage.setItem('members', JSON.stringify(members));
        
        this.renderMember();
    }
}

function renderMember()
{
    //console.log("renderMember is working");
    let members = localStorage.getItem('members') ? JSON.parse(localStorage.getItem('members')) : [];

    //console.log(members.length);

    if(members.length === 0)
    {
        document.getElementById("list-member").style.display = 'none';
        return false;
    }
    else document.getElementById("list-member").style.display = 'block';

            
    let tableContent = `
    <tr>
    <td>#</td>
    <td>Tên:</td>
    <td max-width:50%>Thông tin thêm:</td>
    <td>Tùy chọn:</td>
    </tr>`; 

    members.forEach((member, index)=>{
        let id = index;
        index++;
        tableContent += `
        <tr>
        <td>${index}</td>
        <td>${member.membername}</td>
        <td max-width:50%>${member.memberinfo}</td>
        <td>
            <a class = "dbtn" onclick = "deleteMember(${id})" href="#">Xóa<a/>
        </td>
        </tr>`
        })

    
    document.getElementById("grid-view-member").innerHTML = tableContent;
}

function deleteMember(id)
{
    let members = localStorage.getItem('members') ? JSON.parse(localStorage.getItem('members')) : [];
    members.splice(id, 1);

    localStorage.setItem('members', JSON.stringify(members));

    renderMember();
}