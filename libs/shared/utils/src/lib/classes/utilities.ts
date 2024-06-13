import { Ng2IzitoastService } from 'ng2-izitoast';
import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class Utilities {

  static displayToast(type: string, message?: string) {
    const iziToast = new Ng2IzitoastService();

    switch (type) {
      case 'success':
        iziToast.success({
          title: 'Success',
          message:
            message === undefined
              ? 'Operation completed successfully'
              : message,
          position: 'center',
          zindex: '99999',
        });
        break;

      case 'error':
        iziToast.error({
          title: 'Error',
          message:
            message === undefined
              ? 'Something went wrong. Please try again'
              : message,
          position: 'center',
          zindex: '99999',
        });
        break;

      case 'warning':
        iziToast.warning({
          title: 'Caution',
          message:
            message === undefined ? 'You forgot important data' : message,
          position: 'center',
          zindex: '99999',
        });
        break;

      case 'info':
        iziToast.info({
          title: 'Info',
          message: message === undefined ? '' : message,
          position: 'center',
          zindex: '99999',
        });
        break;
    }
  }


  static decamelize(str: string) {
    return str
      ? str
          .replace(/([a-z\d])([A-Z])/g, '$1 ' + '$2')
          .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 ' + '$2')
          .replace(/(_)/g, ' ')
          .toLowerCase()
      : null;
  }


  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value;
    const confirmPassword: string = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ NoPasswordMatch: true });
    }
  }

}
