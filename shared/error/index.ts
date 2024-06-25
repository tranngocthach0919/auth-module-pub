//error: khong phai loi nghiep vu => loi ki thuat
const ErrFirstNamePattern = new Error('first_name must only contain constters')
const ErrFirstNameEmpty = new Error('first_name is required')
const ErrLastNamePattern = new Error('last_name must only contain constters')
const ErrLastNameEmpty = new Error('last_name is required')
const ErrEmailInvalid = new Error('Email must be a valid email address')
const ErrEmailEmpty = new Error('Email is required')
const ErrPasswordPattern = new Error(
  'Password must contain at least one uppercase constter, one lowercase constter, one number, and one special character'
)
const ErrPasswordMin = new Error('Password must be at least 6 characters long')
const ErrPasswordEmpty = new Error('Password is required')
const ErrPhoneEmpty = new Error('Phone is required')
const ErrPhoneStartWith = new Error('Phone must start with 0')
const ErrPhoneLength = new Error('Phone must be 10 characters long')
const ErrPhonePattern = new Error('Phone must only contain numbers')
const ErrAddressEmpty = new Error('Address is required')
const ErrAddressPattern = new Error("Address doesn'/t contain special characters")
const ErrIdentificationCardEmpty = new Error('Identification Card is required')
const ErrIdentificationCardPattern = new Error('Identification Card must only contain numbers')
const ErrIdentificationCardLength = new Error('Identification Card must be 12 characters long')
const ErrStatusPattern = new Error('Status must be ACTIVE or INACTIVE')

const ErrorBrandNameEmpty = new Error('Name is required')
const ErrorLogoEmpty = new Error('Logo is required')

const ErrorCategoryNameEmpty = new Error('Category name is required')
const ErrorParentEmpty = new Error('Parent is required')

const ErrProductNameEmpty = new Error('Product name is required')
const ErrImageEmpty = new Error('Image is required')
const ErrPriceEmpty = new Error('Price is required')

const ErrProductIdEmpty = new Error('Product id is required')
const ErrQuantityEmpty = new Error('Quantity is required')
const ErrUnitPriceEmpty = new Error('Unit price is required')
const ErrUserIdEmpty = new Error('User id is required')


export {
  ErrFirstNamePattern,
  ErrFirstNameEmpty,
  ErrLastNamePattern,
  ErrLastNameEmpty,
  ErrEmailInvalid,
  ErrEmailEmpty,
  ErrPasswordPattern,
  ErrPasswordMin,
  ErrPasswordEmpty,
  ErrPhoneEmpty,
  ErrPhoneStartWith,
  ErrPhoneLength,
  ErrPhonePattern,
  ErrAddressEmpty,
  ErrAddressPattern,
  ErrIdentificationCardEmpty,
  ErrIdentificationCardPattern,
  ErrIdentificationCardLength,
  ErrStatusPattern,
  ErrorBrandNameEmpty,
  ErrorLogoEmpty,
  ErrorCategoryNameEmpty,
  ErrorParentEmpty,
  ErrProductNameEmpty,
  ErrImageEmpty,
  ErrPriceEmpty,
  ErrProductIdEmpty,
  ErrQuantityEmpty,
  ErrUnitPriceEmpty,
  ErrUserIdEmpty
}
