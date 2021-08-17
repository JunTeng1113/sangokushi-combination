$(document).ready(function () {
    $.ajax({
        async: false, 
        type: "post",
        url: "./data.json",
        data: "data",
        dataType: "json",
        success: function (response) {
            console.log(response);
            const c1 = response[0];
            const c2 = response[1];
            const c3 = response[2];
            $(".C1 .roleName").text(c1['role']);
            $(".C1 .S1 .skillName").text(c1['skill__name']);
            $(".C1 .S1 .skillLevel").text(c1['skill__level']);

            $(".C2 .roleName").text(c2['role']);
            $(".C2 .S1 .skillName").text(c2['skill__name']);
            $(".C2 .S1 .skillLevel").text(c2['skill__level']);

            $(".C3 .roleName").text(c3['role']);
            $(".C3 .S1 .skillName").text(c3['skill__name']);
            $(".C3 .S1 .skillLevel").text(c3['skill__level']);
        }
    });
    $.ajax({
        async: false, 
        type: "post",
        url: "./skill.json",
        data: "data",
        dataType: "json",
        success: function (response) {
            response.forEach(function(element, index) {
                $("#skillMenu > ul").append(`<li index="${index}" level="${element['level']}"><type>[${element['type']}]</type><name>${element['name']}</name></li>`);
            });
        }
    });
    $.ajax({
        async: false, 
        type: "post",
        url: "./data.json",
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
                    ><group>[${element['group']}]</group><name>${element['name']}</name></li>`);
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
        
    });

    $(".S2, .S3").click(function (e) { // 太複雜, 需優化
        if ($(this).find(".skillName").text() == "") {
            if (!($(this).hasClass("selected"))) {
                $(".selected").removeClass("selected");
                $(this).addClass("selected");
            } else {
                $(".selected").removeClass("selected");
            }
        } else {
            $(`#skillMenu > ul > li[index="${$(this).attr("index")}"]`).removeClass("checked");
            $(this).attr("index", "");
            $(this).find(".skillLevel").text("");
            $(this).find(".skillName").text("");
            $(this).removeClass("selected");
        }
        
    });
    $("#roleMenu > ul > li:not(.checked)").click(function (e) { // 太複雜, 需優化
        if ($(".role_selected").length == 1) {
            $(this).addClass("checked");
            
            $(".role_selected").css("background-image", `url('${$(this).attr("image")}')`);
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
            console.log("123");
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
});