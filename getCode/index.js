$(document).ready(function () {
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
                index="${index}" 
                level="${element['level']}"
                type="${element['type']}"
                code="${element['code']}"
                >${element['name']}</li>`);
            });
        }
    });
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
                    index="${index}" 
                    level="${element['level']}" 
                    group="${element['group']}" 
                    code="${element['code']}"
                    >${element['name']}</li>`);
            });
        }
    });

    $("li").click(function (e) { 
        $(this).toggleClass("selected");

        $("#code").val("");
        let code = "";
        const selected = $(".selected");
        selected.each(function (index, element) {
            code += $(element).attr("code");
        });
        $("#code").val(code);
    });

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