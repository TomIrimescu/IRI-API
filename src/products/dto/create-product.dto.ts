import { ObjectType, Field, Int, ID } from 'type-graphql';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

@ObjectType()
export class ProductType {
  @Field(() => ID)
  @IsString()
  id?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  category: string;

  @Field()
  @IsString()
  description: string;

  @Field(() => Int)
  @IsNumber()
  price: number;


}
