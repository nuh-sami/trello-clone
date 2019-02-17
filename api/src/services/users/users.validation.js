module.exports = {
  createRequest(Joi) {
    const name = Joi.string().trim().min(5).max(50)
    .regex(/[\u0621-\u064A\s]/u, 'فقط الحروف العربية و الفراغات').required().label("إسم المستخدم");

    const password = Joi.string().trim().min(8).max(100).required().label('كلمة المرور');

    const email = Joi.string().trim().email().required().label('البريد الإلكتروني');

    return {
      name,
      email,
      password
    };
  }
}
