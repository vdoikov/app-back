import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  findAll(): Promise<Supplier[]> {
    return this.supplierRepository.find();
  }

  // findOne(id: number): Promise<Supplier> {
  //   return this.supplierRepository.findOne({ id });
  // }

  findAllChecked(): Promise<Supplier[]> {
    return this.supplierRepository.find({ where: { checked: true } });
  }

  async findAllUnchecked(): Promise<Supplier[]> {
    const unchecked = this.supplierRepository.find({
      where: { checked: false },
    });
    await this.supplierRepository
      .createQueryBuilder()
      .update()
      .set({ checked: true })
      .where({ checked: false })
      .execute();
    return unchecked;
  }

  create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const supplier = new Supplier();
    supplier.firstName = createSupplierDto.firstName;
    supplier.lastName = createSupplierDto.lastName;
    supplier.email = createSupplierDto.email;
    supplier.edrpo = createSupplierDto.edrpo;
    supplier.companyName = createSupplierDto.companyName;
    return this.supplierRepository.save(supplier);
  }
}
