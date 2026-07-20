// JavaScript Document
$(document).ready(function() {

    "use strict";

    $(".contact-form").submit(function(e) {
        e.preventDefault();

        var form = $(this);
        var flag = true;

        // Validate required text/email inputs and selects
        form.find("input[required], select[required]").each(function() {
            var field = $(this);
            if (!field.val()) {
                field.addClass("error");
                if (flag) field.focus();
                flag = false;
            } else {
                field.removeClass("error").addClass("success");
            }
        });

        if (!flag) return false;

        var name = form.find(".name").val();
        var email = form.find(".email").val();

        // Compose the booking request into the message body
        var msg = "Preferred Day & Time: " + form.find(".daytime").val() +
            "<br/> Type of Session: " + form.find(".session-type").val() +
            "<br/> Session Length: " + form.find(".session-length").val() +
            "<br/> Location: " + form.find("input[name='location']:checked").val() +
            "<br/> Received professional massage before: " + form.find("input[name='experience']:checked").val();

        var dataString = "name=" + encodeURIComponent(name) +
            "&email=" + encodeURIComponent(email) +
            "&subject=" + encodeURIComponent("Booking Request") +
            "&msg=" + encodeURIComponent(msg);

        $(".loading").fadeIn("slow").html("Loading...");
        $.ajax({
            type: "POST",
            data: dataString,
            url: "php/contactForm.php",
            cache: false,
            success: function(d) {
                $(".form-control").removeClass("success");
                if (d == 'success')
                    $('.loading').fadeIn('slow').html('<font color="#48af4b">Booking request sent successfully.</font>').delay(3000).fadeOut('slow');
                else
                    $('.loading').fadeIn('slow').html('<font color="#ff5607">Request not sent. Please try again.</font>').delay(3000).fadeOut('slow');
            }
        });
        return false;
    });

    $("#reset").on('click', function() {
        $(".form-control").removeClass("success").removeClass("error");
    });

})
