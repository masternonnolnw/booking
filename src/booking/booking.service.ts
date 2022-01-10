import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
  ) {}
  async create(createBookingDto: CreateBookingDto) {
    var newBooking = new Booking();
    newBooking.day = createBookingDto.day;
    newBooking.name = createBookingDto.name;
    var checkId = await this.findOne(newBooking.day);
    if (checkId != null) {
      return `Days ${checkId.day} Alredy Booked by User "${checkId.name}"`;
    }
    return await this.bookingRepo.save(createBookingDto);
  }

  async findAll() {
    return await this.bookingRepo.find();
  }

  async findOne(day: number) {
    var res = await this.bookingRepo.findByIds([day]);
    return res[0];
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    return await `This action updates a #${id} booking`;
  }

  async remove(day: number, name: string) {
    var beforeOwner = await this.findOne(day);
    if (beforeOwner == null) {
      return `Nobody book Day ${day}`;
    } else {
      if (name == beforeOwner.name) {
        var res = await this.bookingRepo.delete(day);
        return `Cancel book Day ${day}`;
      } else {
        return `Cannot cancel because you not the "Owner"`;
      }
    }
  }
}
