import { FormGroup } from '@angular/forms';
declare var $: any;
// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
export function MustNotMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustNotMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value == matchingControl.value) {
            matchingControl.setErrors({ mustNotMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function IsMinor(matchingControlName: string) {

    return (formGroup: FormGroup) => {

        const matchingControl = formGroup.controls[matchingControlName];
        var dob = matchingControl.value;
        var txtDOB = dob.split("/");
        var dateString = txtDOB[2] + '/' + txtDOB[1] + '/' + txtDOB[0];
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (matchingControl.errors && !matchingControl.errors.minor) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        if (age < 18) {
            matchingControl.setErrors({ minor: true });
        }
        else {
            matchingControl.setErrors(null);
        }

    }
}


export const IsValidARN = "^[0-9]{1,6}$";
export const IsValidMobile = "^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$";
export const IsValidPAN = "^[A-Z]{3}[PH]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}$";
export const IsValidOTP = "^[0-9]{6}$";
export const IsValidEUIN = "^[0-9]{6}$";
export const IsValidEUINWithCapitalE = "^[E][0-9]{6}$";
export const IsValidPinCode = "^[1-9][0-9]{5}$";
export const IsValidPassword = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&#])[A-Za-z0-9@$!%*?&#]{8,14}$";
export const IsMICRCode = "^[0-9]{9}$";
export const IFSCCode = "^[A-Z]{4}0[A-Z0-9]{6}$";
export const NumberOnly = "^[0-9]*$";
export const NumberOnlyWithDecimal = "^[0-9]*.[0-9]*$";
export const CharacterOnly = "^[A-Za-z]*$";
export const AlphaNumericOnly = "^[A-Za-z0-9]*$";
export const CharacterANDSpaceOnly = "^[a-zA-Z]{1,}( [a-zA-Z ]{1,})$";
export const CharacterAndOptionalSpace = "^[A-Za-z][A-Za-z ?]*$";
export const IsValidName = "^[a-zA-Z]{1,}( [a-zA-Z. ]{1,})$";
export const IsValidCompanyName = "^[a-zA-Z0-9]{1,}[a-zA-Z0-9@&.()]{1,}([ A-Za-z0-9@.&()]{1,})$";
export const IsValidDate = "^([0-2][0-9]|(3)[0-1])\/(((0)[1-9])|((1)[0-2]))\/([1-9][0-9]{3})$";
export const IsValidDateDash = "^([0-2][0-9]|(3)[0-1])-(((0)[1-9])|((1)[0-2]))-([1-9][0-9]{3})$";
//export const IsValidEmail = "^\w+([\.-]?\w+)*@\w+([\.]?\w+)*(\.\w{2,3})+$";
export const IsValidEmail = "";
export const IsValidAddress = "^[A-Za-z0-9\/ ,.-]+$";
export const IsValidAadharNo = "^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$"
export const IsValidUPIID = "^[\w.-]{4,20}@[\w.-]+$";//"^\w.+@\w+$"
export const IsValidUPIID2 = "^[\w.-]{4,20}$"
export const IsDPID = "^[0-9]{6}$";
export const IsDPIDClientId = "^[0-9]{8}$";
export const IsDPIDCDSL = "^[0-9]{16}$";

$(document).ready(function () {
    $(".numonly").on("input", function () {
        var regexp = /[^\d\.\-]/g;
        if ($(this).val().match(regexp)) {
            $(this).val($(this).val().replace(regexp, ''));
        }
    });

    $(".alphaonly").on("input", function () {
        var regexp = /[^a-zA-Z ]/g;
        if ($(this).val().match(regexp)) {
            $(this).val($(this).val().replace(regexp, ''));
        }
    });

    $('img.svg').each(function () {
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });
});
export function isNullOrUndefined(object: unknown) {
    let val: boolean = false;
    if (object == null || object == undefined) {
        val = true;
    }
    return val;
}

export let DefaultCompanyLogoBs64 = "data:image/png;base64,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"

