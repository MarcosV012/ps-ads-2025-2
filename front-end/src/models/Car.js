import { z } from 'zod'

const maxYearManufacture = new Date()
maxYearManufacture.setFullYear(maxYearManufacture.getFullYear())

const storeOpen = new Date(2020, 2, 20)
const maxSellingDate = new Date()


const validColors = [
 'AMARELO', 'AZUL', 'BRANCO', 'CINZA', 'DOURADO', 
 'LARANJA', 'MARROM', 'PRATA', 'PRETO', 'ROSA', 
 'ROXO', 'VERDE', 'VERMELHO'
]

const Car = z.object({
 brand: z.string()
    .trim()
    .min(1, { message: 'A marca deve ter, no mínimo, 1 caracteres.' })
    .max(25, { message: 'A marca deve ter, no máximo, 25 caracteres.' }),

 model: z.string()
    .trim()
    .min(1, { message: 'O modelo deve ter, no mínimo, 1 caracteres.' })
    .max(25, { message: 'O modelo deve ter, no máximo, 25 caracteres.' }),

 color: z.enum(validColors, {
    message: 'Cor inválida.' }),

 year_manufacture: z.coerce.number()
    .int ({ message: 'O ano de fabricação deve ser um número inteiro.' })
    .min(1960, { message: 'O ano de fabricação não pode ser menor que 1960. '})
    .max(maxYearManufacture, { message: `O ano de fabricação não pode ser maior que o ano atual (${maxYearManufacture}) . `}),

 imported: z.boolean({
    message: 'O campo importado deve ser um valor booleano (verdadeiro ou falso).'}),

 plates: z.string()
    .transform(val => val.replace('_', ''))
   // Depois de transform(), o Zod não permite usar length(). Por isso,
   // precisamos usar uma função personalizada com refine() para validar
   // o comprimento do valor
   .refine(val => val.length === 8, {
     message: 'O número da placa deve ter 8 posições.'
   }),
 
 selling_date: z.coerce.date()
    .min(storeOpen, { message: 'A data de venda não pode ser anterior à data de abertura da loja (20/03/2020). '})
    .max(maxSellingDate, { message: 'A data de venda não pode ser uma data futura. '})
    .nullish(),

 selling_price: z.coerce.number()
    .gte(5000, { message: 'O preço de venda deve ser no mínimo R$ 5.000,00.' })
    .lte(5000000, { message: 'O preço de venda deve ser no máximo R$ 5.000.000,00.' })
    .nullish(),
 })
export default Car
