
export const PasswordCheck = (password) => { 
    let score = 0;
    if (password.length > 7) {
      if (/[a-z]/.test(password)) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/\d/.test(password)) score++;
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    }
    return score;
 }