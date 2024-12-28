import bcrypt from 'bcryptjs'

const hash = (password: string) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const compare = (password: string, hashedPass: string) => {
    return bcrypt.compareSync(password, hashedPass)
}

export { hash, compare }