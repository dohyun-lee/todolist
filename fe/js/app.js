(function (window) {
    'use strict';
    var url = "/api/todos/";

    //var newTodoList = '<li><div class = "view"><input class="toggle" type = "checkbox"> <label>{{todo}} </label><button class="destroy"></button></div></li>';

    //var addTemplate = Handlebars.compile(newTodoList);
    var date = new Date();

    var now = date.toISOString();


    $.ajax(url,{
        dataType: "json",
        type : "get"
    }).done(function(data){
        for(var i = data.length-1; i >= 0 ; i--){ //데이타가 보여지는 순서를 유지하기 위해 --하는 형태로...
            $('<li data-id='+data[i].id+' data-todo='+data[i].todo+'><div class = "view">'+
                '<input class="toggle" type = "checkbox"> <label>'+
                     data[i].todo + '</label><button class="destroy">'+
                     '</button></div></li>').appendTo(".todo-list");//this가 new-todo가리킴.

             if(data[i].completed === 1){
                $('[data-id=' + data[i].id + ']').toggleClass('completed');
                 $('[data-id=' + data[i].id +']'+'> div > input').prop('checked', true);
             }

             console.log(data[i]);

        }

    }).fail(function(){
        console.log("not connected...");
    });


    //all - completed
    $(".toggle-all").on("click", function(e,data){
        var chk = 0;
        if($(this).prop('checked')){
            $("li").addClass("completed");
            chk = 1;
        }else{
            $("li").removeClass("completed");
            chk = 0;
        }

    });

    //추가
    $(".new-todo").on("keyup",function(e){
        var value = $(this).val();
        $("li").text = value;
        if(e.keyCode !== 13 || !value) return;

        var object = {
            "todo" : $(this).val(),
            "completed" : "0",
            "date" : now
        }

        $.ajax(url,{
            dataType : "json",
            type : "post",
            data : JSON.stringify(object),
            contentType : "application/json; charset=UTF-8"
        }).done(function(data){
            if($(this).val = "") return;
            $(".todo-list").prepend('<li><div class = "view"><input class="toggle" type = "checkbox"> <label>'
                    + value + '</label><button class="destroy"></button></div></li>');//this가 new-todo가리킴.
            console.log(data);
        }).fail(function(){
            alert("Error!!");
            console.log(status);
        });
        $(this).val("");

    });

    //완성
    $(".todo-list").on("change",".toggle",function(e,data){
        var li = $(e.target).closest("li");
        var elementId = $(li).data("id");
        var completeCheck = 0;

        $(li).toggleClass("completed");

        if($(this).prop('checked')){
            //$(this).closest("li").addClass("completed");
            completeCheck = 1;
        }else{
            //$(this).closest("li").removeClass("completed");
            completeCheck = 0;
        }

        var object2 = {
            "todo" : $(li).data("todo"),
            "completed" : completeCheck,
            "date" : now
        }
        $.ajax({
            url : url+elementId,
            type : "put",
            data: JSON.stringify(object2),
            dataType: "json",
            contentType : "application/json"
        }).done(function(data){
            console.log(data, status);
        }).fail(function(){
            alert('there is completed error');
        });
    });

    //삭제
    $(".todo-list").on("click", ".destroy", function(e){
        //if($(this).closest("li").slideUp());
        var li = $(e.target).closest("li");
        var elementId = $(this).closest("li").data("id");
        console.log(elementId);

        $.ajax({
            url : url+elementId,
            type : "DELETE"
        }).done(function(data,status){
            $(li).slideUp();
            console.log(data);
        }).fail(function(){
            alert("there is destroy error...");
        })

    });

})(window);

//$("#chkbox").length