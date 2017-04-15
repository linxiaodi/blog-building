require('../css/index.scss')

$.ajax({
    type : 'GET',
    url : '/user.action',
    dataType: 'json'
}).done(function(msg){
    let template = `<h4>${msg.age}</h4><h4>${msg.name}</h4>`;
    $(document.body).append(template);
})
$.post({
    url : '/postMsg.action',
    data : JSON.stringify({
        color : '蓝色',
        pet : 'dog'
    }),
    dataType : 'json'
}).done(function(data){
    for (var attr in data ){
        $(document.body).append('<h2>'+ data[attr] +'</h2>')
    }
})