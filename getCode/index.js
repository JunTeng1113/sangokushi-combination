import {compression, decompression} from "../function.js";
$(document).ready(function () {
    let skillCode = "";
    let roleCode = "";
    $.ajax({
        async: false, 
        type: "post",
        url: "../data/data.json",
        data: "data",
        dataType: "json",
        success: function (response) {
            response.forEach(function(element, index) {
                const image = element['image'].replace("{name}", element['name']);
                $("#roleMenu > ul").append(`<li 
                    class="role" 
                    index="${element['index']}" 
                    level="${element['level']}" 
                    group="${element['group']}" 
                    code="${element['code']}"
                    >${element['name']}</li>`);
                    roleCode = "0" + roleCode;
            });
        }
    });
    $.ajax({
        async: false, 
        type: "post",
        url: "../data/skill.json",
        data: "data",
        dataType: "json",
        success: function (response) {
            response.forEach(function(element, index) {
                $("#skillMenu > ul").append(`<li 
                class="skill" 
                index="${element['index']}" 
                level="${element['level']}"
                type="${element['type']}"
                code="${element['code']}"
                >${element['name']}</li>`);
                skillCode = "0" + skillCode;
            });
        }
    });

    $("li").click(function (e) { 
        $(this).toggleClass("selected");

        $("#code").val(compression(getCode($(".role"))) + "," + compression(getCode($(".skill"))));
        console.log(compression(getCode($(".role"))) + "," + compression(getCode($(".skill"))));
    });


    function reverse(string) {
        return string.split('').reverse().join('');
    }

    function getCode(cls) {
        var array = [1000];
        cls.each(function (index, element) {
            array[$(element).attr("index")] = $(element).hasClass("selected") ? 1 : 0;
        });
        const code = array.join("");
        return code;
    }

    function decTo62(number) {
        const string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var number62 = "";
        while (number > 0) {
            number62 = string[number % 62] + number62;
            number = parseInt(number / 62);
        }
        return number62;
        
    }

    $(`input[name="filterRole"]`).change(function (e) { 
        $(".role").css("display", "none");
        console.log($(`input[name="filterRole"]:checked`).attr("id"));
        const checked = $(`input[name="filterRole"]:checked`);
        checked.each(function (index, element) {
            $(`.role[group="${$(element).attr("id")}"]`).css("display", "");
        });
        
    });
    $(`input[name="filterSkill"]`).change(function (e) { 
        $(".skill").css("display", "none");
        console.log($(`input[name="filterSkill"]:checked`).attr("id"));
        const checked = $(`input[name="filterSkill"]:checked`);
        checked.each(function (index, element) {
            $(`.skill[type="${$(element).attr("id")}"]`).css("display", "");
        });
        
    });

    $("#copy").click(function (e) { 
        const inputField = $("#code");
        inputField.select();
        document.execCommand("copy");
    });

    $(".roleAllChecked").click(function (e) { 
        const status = $(this).attr("status");
        toggleChecked(this, status);
        $("#code").val(compression(getCode($(".role"))) + "," + compression(getCode($(".skill"))));
    });
    $(".skillAllChecked").click(function (e) { 
        const status = $(this).attr("status");
        toggleChecked(this, status);
        $("#code").val(compression(getCode($(".role"))) + "," + compression(getCode($(".skill"))));
    });

    $("#apply").click(function (e) { 
        const roleCode = $("#code").val().split(",")[0];
        const skillCode = $("#code").val().split(",")[1];
        console.log(decompression(roleCode) + "," + decompression(skillCode));
        apply(".role", roleCode);
        apply(".skill", skillCode);
    });

    function apply(cls, code) {
        const array = decompression(code).split("");
        array.forEach(function(element, index) {
            console.log(element);
            if (element == "1") {
                $(`${cls}[index=${index}]`).addClass("selected");
            } else {
                $(`${cls}[index=${index}]`).removeClass("selected");
            }
        });
    }

    function toggleChecked(element, status) {
        if ($(element).hasClass("roleAllChecked")) {
            switch (status) {
                case undefined:
                case "0":
                    $(`.role:not([style*="display: none"])`).addClass("selected");
                    $(element).attr("status", "1");
                    $(element).text("反選");
                    break;

                case "1":
                    $(`.role:not([style*="display: none"])`).removeClass("selected");
                    $(element).attr("status", "0");
                    $(element).text("全選");
                    break;
            
                default:
                    break;
            }

        } else if ($(element).hasClass("skillAllChecked")) {
            switch (status) {
                case undefined:
                case "0":
                    $(`.skill:not([style*="display: none"])`).addClass("selected");
                    $(element).attr("status", "1");
                    $(element).text("反選");
                    break;

                case "1":
                    $(`.skill:not([style*="display: none"])`).removeClass("selected");
                    $(element).attr("status", "0");
                    $(element).text("全選");
                    break;
            
                default:
                    break;
            }
        }
    }
});