import { PartialType } from '@nestjs/swagger';
import { CreatePostReqDto } from 'src/modules/posts/dtos/post.request.dto';

export class UpdatePostReqDto extends PartialType(CreatePostReqDto) {}
