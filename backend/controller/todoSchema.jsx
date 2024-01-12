import joi from 'joi'
export const taskSchema = joi.object({
    item: joi.string().required()
})

