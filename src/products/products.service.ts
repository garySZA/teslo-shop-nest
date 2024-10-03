import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';
import { PaginationDto } from 'src/common/dtos';

@Injectable()
export class ProductsService {
    private readonly logger = new Logger();

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}

    async create(createProductDto: CreateProductDto) {
        try {
            const product = this.productRepository.create(createProductDto);

            await this.productRepository.save(product);

            return product;
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    findAll(paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;

        return this.productRepository.find({ take: limit, skip: offset });
    }

    async findOne(term: string) {
        let product: Product;

        if (isUUID(term)) {
            product = await this.productRepository.findOneBy({ id: term });
        } else {
            const queryBuilder = this.productRepository.createQueryBuilder();
            product = await queryBuilder
                .where(`UPPER(title) =:title or slug =:slug`, {
                    title: term.toUpperCase(),
                    slug: term.toLowerCase(),
                })
                .getOne();
        }

        if (!product)
            throw new NotFoundException(`Product with id ${term} not found`);

        return product;
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.productRepository.preload({
            id,
            ...updateProductDto,
        });

        if (!product)
            throw new NotFoundException(`Product with id ${id} not found`);

        try {
            await this.productRepository.save(product);

            return product;
        } catch (error) {
            this.handleDBExceptions(error);
        }

        return this.productRepository.save(product);
    }

    async remove(id: string) {
        const product = await this.findOne(id);

        await this.productRepository.remove(product);
    }

    private handleDBExceptions(error: any) {
        if (error.code === '23505') throw new BadRequestException(error.detail);

        this.logger.error(error);

        throw new InternalServerErrorException('Ayuda!');
    }
}
