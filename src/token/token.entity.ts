import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "tokens" })
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  hash: string

  @Column({ length: 255 })
  username: string
}