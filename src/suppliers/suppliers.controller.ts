import { Controller, Body, Get, Post } from '@nestjs/common';
import { Supplier } from './supplier.entity';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly supplierService: SuppliersService) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    return this.supplierService.create(createSupplierDto);
  }
  @Get()
  findAll(): Promise<Supplier[]> {
    return this.supplierService.findAll();
  }

  @Get('/checked')
  findAllChecked(): Promise<Supplier[]> {
    return this.supplierService.findAllChecked();
  }

  @Get('/unchecked')
  findAllUnchecked(): Promise<Supplier[]> {
    return this.supplierService.findAllUnchecked();
  }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number): Promise<Supplier> {
  //   return this.supplierService.findOne(id);
  // }
}
