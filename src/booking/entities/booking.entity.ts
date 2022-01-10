import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryColumn()
  'day': number;

  @Column()
  'name': string;
}
