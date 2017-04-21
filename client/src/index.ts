import { Person } from './Person'

const popniten = new Person({name: 'Pär', age: 35})

console.log(popniten.getName() + ", " + popniten.getAge())
