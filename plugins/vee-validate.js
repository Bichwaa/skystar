// plugins/vee-validate.js
import { defineRule, configure } from 'vee-validate';
import { required, email } from '@vee-validate/rules';

// Define rules
defineRule('required', required);
defineRule('email', email);

// Configure VeeValidate
configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `The field ${ctx.field} is required.`,
      email: `The field ${ctx.field} must be a valid email.`,
    };

    return messages[ctx.rule.name]
      ? messages[ctx.rule.name]
      : `The field ${ctx.field} is invalid.`;
  },
});


export default defineNuxtPlugin(() => {
    return {
      provide: {
        validator:configure
      }
    }
  })