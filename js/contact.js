 // submit form
 hbspt.forms.create({
     region: "na1",
     portalId: "46509569",
     formId: "ce5884a2-b600-43db-8e89-fb873f216ac4"
 });

 // copy email address
 function copyText(elementId) {
     var input = document.createElement("input");
     input.value = document.getElementById(elementId).innerHTML;
     document.body.appendChild(input);
     input.select();
     document.execCommand("copy");
     document.body.removeChild(input);
 }