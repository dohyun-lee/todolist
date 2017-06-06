(function (window) {
    'use strict';
    var url = "/api/todos/";

    var date = new Date();
    var now = date.toISOString();
    var left_len = 0;

    //초기화면
    $.ajax({
        url : url,
        dataType: "json",
        type : "get",
        success : function(data){

            for(var i = 0; i < data.length ; i++){ //데이타가 보여지는 순서를 유지하기 위해 --하는 형태로...
                $(".todo-list").prepend('<li data-id='+data[i].id+' data-todo='+data[i].todo+'><div class = "view">'+
                    '<input class="toggle" type = "checkbox"> <label>'+
                         data[i].todo + '</label><button class="destroy">'+
                         '</button></div></li>');

                if(data[i].completed === 1){
                    $('[data-id=' + data[i].id +']').toggleClass('completed');
                    $('[data-id=' + data[i].id +']'+'> div > input').prop('checked', true);
                }else{
                    left_len = left_len+1;
                }
                //console.log(data[i]);
            }
            $(".todo-count strong").text(left_len);
        }, error: function(){
            console.log("not connected...");
            }
    });


    //추가
    $(".new-todo").on("keyup",function(e){
        var value = $(this).val();
        $("li").text = value;

        if(e.keyCode !== 13 || !value) return;

        var input_obj = {
            "todo" : $(this).val(),
            "completed" : "0",
            "date" : now
        }

        $.ajax({
            url : url,
            dataType : "json",
            type : "post",
            data : JSON.stringify(input_obj),
            contentType : "application/json; charset=UTF-8",
            success: function(data){
                if($(this).val = "") return;
                $(".todo-list").prepend('<li><div class = "view">'+
                    '<input class="toggle" type = "checkbox"> <label>'+
                        value + '</label><button class="destroy"></button></div></li>');//this가 new-todo가리킴.
                left_len++;
                $(".todo-count strong").text(left_len);
            }, error: function(){
                    alert("input Error");
               }

        });

        $(this).val("");
    });


    //all - completed
    $(".toggle-all").on("click", function(){
        if($(this).prop('checked')){
            $(".todo-list li").addClass("completed");
            $(".todo-list li .toggle").prop("checked",true);
            left_len=0;
        }else{
            $(".todo-list li").removeClass("completed");
            $(".todo-list li .toggle").prop("checked",false);

        }
        $(".todo-count strong").text(left_len);
    });

    //complete
    $(".todo-list").on("change",".toggle",function(e){
        var li = $(e.target).closest("li");
        var elementId = $(li).data("id");
        var chk = 0;

        if($(this).prop('checked')){
            $(li).addClass("completed");
            chk = 1;
            left_len--;
        }else{
            $(li).removeClass("completed");
            chk = 0;
            left_len++;
        }

        var complete_obj = {
            "todo" : $(li).data("todo"),
            "completed" : chk,
            "date" : now
        }
        $.ajax({
            url : url+elementId,
            type : "put",
            data: JSON.stringify(complete_obj),
            dataType: "json",
            contentType : "application/json",
            success: function(data){
                $(".todo-count strong").text(left_len);
            },
            error: function(){
                alert('complete error');
            }
        })
    });

    //삭제
    $(".todo-list").on("click", ".destroy", function(e){
        var li = $(e.target).closest("li");
        var elementId = $(li).data("id");

        $.ajax({
            url : url+elementId,
            type : "DELETE",
            success: function(data,status){
                $(li).slideUp();
                left_len--;
                $(".todo-count strong").text(left_len);
            }, error: function(){
            alert("delete error");
            }
        })
    });


    //할 일 리스트 필터링
    $(".filters").on("click", function(e){
        console.log("Click");
        $(".filters li a.selected").not(this).removeClass("selected");

        var a = $(e.target).closest("a");
        $(a).toggleClass("selected");

        if($(a).attr('href') === "#/"){
            $(".todo-list li").show("fast");
        }
        if($(a).attr('href') === "#/active"){
            $(".todo-list li.completed").hide("fast");
            $(".todo-list li").not(".completed").show("fast");
        }
        if($(a).attr('href') === "#/completed"){
            $(".todo-list li").filter(".completed").show("fast");
            $(".todo-list li").not(".completed").hide("fast");
        }
    })

    //완료한 일 삭제
    $(".clear-completed").on("click", function(e){
        var li = $(e.target).closest("li");
        var elementId = $(this).closest("li").data("id");

        $(".todo-list li.completed").hide("fast");
    });

})(window);