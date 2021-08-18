$(document).ready(function () {
    $.ajax({
        async: false, 
        type: "post",
        url: "./data/skill.json",
        data: "data",
        dataType: "json",
        success: function (response) {
            response.forEach(function(element, index) {
                $("#skillMenu > ul").append(`<li 
                index="${index}" 
                level="${element['level']}"
                code="${element['code']}"
                ><type>[${element['type']}]</type><name>${element['name']}</name></li>`);
            });
        }
    });
    $.ajax({
        async: false, 
        type: "post",
        url: "./data/data.json",
        data: "data",
        dataType: "json",
        success: function (response) {
            response.forEach(function(element, index) {
                const image = element['image'].replace("{name}", element['name']);
                $("#roleMenu > ul").append(`<li 
                    index="${index}" 
                    level="${element['level']}" 
                    skillLevel="${element['skill__level']}" 
                    skillName="${element['skill__name']}" 
                    image="${image}"
                    group="${element['group']}"
                    code="${element['code']}"
                    ><name>${element['name']}</name></li>`);
            });
        }
    });

    $(".role").click(function (e) { // 太複雜, 需優化
        if (!($(this).hasClass("role_selected"))) {
            $(".role_selected").removeClass("role_selected");
            $(this).addClass("role_selected");
            
        } else {
            $(".role_selected").removeClass("role_selected");
        }
        $(".role").dblclick(function (e) { 
            if (!($(this).text() == "")) {
                $(`#roleMenu > ul > li[index="${$(this).attr("index")}"]`).removeClass("checked");

                $(this).attr("index", "");
                $(this).css("background-image", ``);
                $(this).text("");
                $(this).removeClass("role_selected");
            }
            
        });
    });

    $(".S2, .S3").click(function (e) { // 太複雜, 需優化
        if (!($(this).hasClass("selected"))) {
            $(".selected").removeClass("selected");
            $(this).addClass("selected");
        } else {
            $(".selected").removeClass("selected");
        }
        $(".S2, .S3").dblclick(function (e) { 
            if (!($(this).find(".skillName").text() == "")) {
                $(`#skillMenu > ul > li[index="${$(this).attr("index")}"]`).removeClass("checked");

                $(this).attr("index", "");
                $(this).find(".skillLevel").text("");
                $(this).find(".skillName").text("");
                $(this).removeClass("selected");
            }
        });
    });
    $("#roleMenu > ul > li:not(.checked)").click(function (e) { // 太複雜, 需優化
        if ($(".role_selected").length == 1) {
            if (!($(".role_selected").text() == "")) {
                $(`#roleMenu > ul > li[index="${$(".role_selected").attr("index")}"]`).removeClass("checked");
            }
            $(this).addClass("checked");
            
            $(".role_selected").text($(this).find("name").text());
            $(".role_selected").css("background-image", `url('${$(this).attr("image")}')`);
            $(".role_selected").attr("index", $(this).attr("index"));
            $(".role_selected").find(".roleInfo").attr("level", $(this).attr("level"));
            $(".role_selected").find(".roleInfo").find(".roleName").text($(this).find("name").text());
            $(".role_selected").find(".roleInfo").find(".roleGroup").text($(this).find("group").text());
            $(".role_selected").siblings(".skillList").find(".S1").find(".skillLevel").text($(this).attr("skillLevel"));
            $(".role_selected").siblings(".skillList").find(".S1").find(".skillName").text($(this).attr("skillName"));
            $(".role_selected").removeClass("role_selected");
        }
    });

    $("#skillMenu > ul > li:not(.checked)").click(function (e) { // 太複雜, 需優化
        if ($(".selected").length == 1 && !$(this).hasClass("checked")) {
            if (!($(".selected").text() == "")) {
                $(`#skillMenu > ul > li[index="${$(".selected").attr("index")}"]`).removeClass("checked");
            }
            $(this).addClass("checked");

            $(".selected").attr("index", $(this).attr("index"));
            $(".selected").find(".skillLevel").text($(this).attr("level"));
            $(".selected").find(".skillName").text($(this).find("name").text());
            $(".selected").removeClass("selected");
        }
    });

    $("#searchRole").keydown(function (e) { 
        const filter = $(this).val();
        const list = $("#roleMenu ul li");
        list.each(function (index, element) {
            console.log(element.innerHTML.indexOf(filter));
            if (element.innerHTML.indexOf(filter) >= 0) {
                $(element).css("display", "list-item");
            } else {
                $(element).css("display", "none");
            }
            
        });
    });
    $("#searchSkill").keydown(function (e) { 
        const filter = $(this).val();
        const list = $("#skillMenu ul li");
        list.each(function (index, element) {
            console.log(element.innerHTML.indexOf(filter));
            if (element.innerHTML.indexOf(filter) >= 0) {
                $(element).css("display", "list-item");
            } else {
                $(element).css("display", "none");
            }
            
        });
    });


    let code = "";
    const role = $("#roleMenu ul li");
    role.each(function (index, element) {
        code += $(element).attr("code");
    });
    const skill = $("#skillMenu ul li");
    skill.each(function (index, element) {
        code += $(element).attr("code");
    });
    

    $("#apply").click(function (e) { 
        if ($(".codebar").val() == "") {
            $(".codebar").val(code);
        }
        const array = $(".codebar").val().match(/.{1,3}/g);
        $("li").addClass("hidden");
        array.forEach(element => {
            $(`li[code="${element}"]`).removeClass("hidden");
        });
    });
});