function save()
{
    let membername = document.getElementById("member-name").value;
    let memberinfo = document.getElementById("member-info").value;

    //console.log(membername,memberinfo);
//  xu li cho dep
    if(_.isEmpty(membername)){
        document.getElementById('require-pn').innerHTML = "Phải nhập têm thành viên";
    }else
    {
        document.getElementById('require-pn').className = "green";
        document.getElementById('require-pn').innerHTML = "OK";
    }
//xu li luu
    if(membername)
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
    <td>Tên thành viên:</td>
    <td>Thông tin thêm:</td>
    <td>Tùy chọn:</td>
    </tr>`; 

    members.forEach((member, index)=>{
        let id = index;
        index++;
        tableContent += `
        <tr>
        <td>${index}</td>
        <td>${member.membername}</td>
        <td>${member.memberinfo}</td>
        <td>
            <a onclick = "deleteMember(${id})" href="#">Xóa<a/>
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