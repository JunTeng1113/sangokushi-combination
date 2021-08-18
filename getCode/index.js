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
                index="${index}" 
                level="${element['level']}"
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
                    index="${index}" 
                    level="${element['level']}" 
                    skillLevel="${element['skill__level']}" 
                    skillName="${element['skill__name']}" 
                    image="${image}"
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
});