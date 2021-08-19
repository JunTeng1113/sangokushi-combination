import { compression, decompression } from "./function.js";

$(document).ready(function () {
    $.ajax({
        async: false, 
        type: "post",
        url: "./data/skill.json",
        data: "data",
        dataType: "json",
        success: function (response) {
            response.forEach(function(element, index) {
                let icon = "";
                switch (element['type']) {
                    case "陣法":
                        icon = `<i class="fas fa-border-all"></i>`;
                        break;

                    case "兵種":
                        icon = `<i class="fas fa-horse"></i>`;
                        break;
                
                    default:
                        break;
                }
                $(`.skillList ul[type~="${element['type']}"]`).append(`<li 
                class="skill" 
                index="${element['index']}" 
                level="${element['level']}"
                type="${element['type']}"
                code="${element['code']}"
                >${icon}<name>${element['name']}</name></li>`);
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
                $(`.roleList ul[group="${element['group']}"]`).append(`<li 
                    class="role" 
                    index="${element['index']}"
                    cost="${element['cost']}" 
                    level="${element['level']}" 
                    skillLevel="${element['skill__level']}" 
                    skillName="${element['skill__name']}" 
                    image="${image}"
                    group="${element['group']}"
                    code="${element['code']}"
                    ><group class="${element['group']}">${element['group']}</group> <name>${element['name']}</name></li>`);
            });
        }
    });

    $(".roleField").click(function (e) { // 太複雜, 需優化
        if (!($(this).hasClass("role_selected"))) {
            $(".role_selected").removeClass("role_selected");
            $(this).addClass("role_selected");
            
        } else {
            $(".role_selected").removeClass("role_selected");
        }
        $(".roleField").dblclick(function (e) { 
            if (!($(this).text() == "")) {
                $(`.list .role[index="${$(this).attr("index")}"]`).removeClass("checked");

                $(this).attr("index", "");
                $(this).css("background-image", ``);
                $(this).text("");
                $(this).removeClass("role_selected");
                $(this).siblings(".skills").find(".S1").find(".skillLevel").text("");
                $(this).siblings(".skills").find(".S1").find(".skillName").text("");
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
                $(`.list .skill[index="${$(this).attr("index")}"]`).removeClass("checked");

                $(this).attr("index", "");
                $(this).find(".skillLevel").text("");
                $(this).find(".skillName").text("");
                $(this).removeClass("selected");
            }
        });
    });
    $(".list .role").click(function (e) { // 太複雜, 需優化
        if ($(".role_selected").length == 1 && !$(this).hasClass("checked")) {
            if (!($(".role_selected").text() == "")) {
                $(`.list .role[index="${$(".role_selected").attr("index")}"]`).removeClass("checked");
            }
            $(this).addClass("checked");
            
            $(".role_selected").css("background-image", `url('${$(this).attr("image")}')`);
            $(".role_selected").text(`${$(this).find("name").text()} ${$(this).attr("cost")}`);
            
            $(".role_selected").attr("index", $(this).attr("index"));
            $(".role_selected").find(".roleInfo").attr("level", $(this).attr("level"));
            $(".role_selected").find(".roleInfo").find(".roleName").text($(this).find("name").text());
            $(".role_selected").find(".roleInfo").find(".roleGroup").text($(this).find("group").text());
            $(".role_selected").siblings(".skills").find(".S1").find(".skillLevel").text($(this).attr("skillLevel"));
            $(".role_selected").siblings(".skills").find(".S1").find(".skillName").text($(this).attr("skillName"));
            $(".role_selected").removeClass("role_selected");
        }
    });

    $(".list .skill").click(function (e) { // 太複雜, 需優化
        if ($(".selected").length == 1 && !$(this).hasClass("checked")) {
            if (!($(".selected").text() == "")) {
                $(`.list .skill[index="${$(".selected").attr("index")}"]`).removeClass("checked");
            }
            $(this).addClass("checked");

            $(".selected").attr("index", $(this).attr("index"));
            $(".selected").find(".skillLevel").text($(this).attr("level"));
            $(".selected").find(".skillName").text($(this).find("name").text());
            $(".selected").removeClass("selected");
        }
    });

    $("#apply").click(function (e) { 
        let code = $(".codebar").val();
        let roleCode = code.substring(0, code.indexOf(","));
        let skillCode = code.substring(code.indexOf(",") + 1);
        $("li").addClass("hidden");
        display(".role",decompression(roleCode));
        display(".skill",decompression(skillCode));
    });
    function display(group, code) {
        for (let index = 0; index < code.length; index++) {
            const element = code[index];
            if (element == "1") {
                $(`${group}[index="${index}"]`).removeClass("hidden");
            }
            
        }
    }

});