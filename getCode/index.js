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

        $("#code").val("");
        if ($(this).hasClass("role")) {
            roleCode = getNewCode(roleCode,  parseInt($(this).attr("index")), $(this).hasClass("selected"));

        } else if ($(this).hasClass("skill")) {
            skillCode = getNewCode(skillCode,  parseInt($(this).attr("index")), $(this).hasClass("selected"));
        }
        $("#code").val(compression(roleCode) + "," + compression(skillCode));
    });


    function reverse(string) {
        return string.split('').reverse().join('');
    }

    function getNewCode(code, index, boolean) {
        var reverseCode = reverse(code);
        if (boolean) {
            reverseCode = reverseCode.substring(0, index) + "1" + reverseCode.substring(index + 1)
        } else {
            reverseCode = reverseCode.substring(0, index) + "0" + reverseCode.substring(index + 1)
        }
        return reverse(reverseCode);
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
});