import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingService.create(createBookingDto);
  }

  @Get()
  async findAll() {
    return await this.bookingService.findAll();
  }

  @Get(':day')
  async findOne(@Param('day') day: number) {
    return await this.bookingService.findOne(day);
  }

  @Patch(':day')
  async update(
    @Param('day') day: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return await this.bookingService.update(day, updateBookingDto);
  }

  @Delete(':day')
  async remove(@Param('day') day: number, @Body('name') name: string) {
    return await this.bookingService.remove(day, name);
  }
}
