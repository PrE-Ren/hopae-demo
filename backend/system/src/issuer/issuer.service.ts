import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestCareerVcDTO } from './dto/request-career-vc.dto';
import { Career } from './entities/career.entity';
import { Claims } from './dto/claims.dto';
import { Player } from './entities/player.entity';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class IssuerService {
    constructor(readonly jwtService: JwtService) {}


    private careers: Career[] = []; //DB table

    private issuer = new Player({
        id:"issuer_did",
        private_key:"issuer_private_key"
    });

    start() {
        this.careers.push({
            id: "example_did",
            ...{
                department: "개발부서",
                position: "대리",
                salary: 50000, 
                join: "20221222",
                leave: "20241222" 
            }
        });

        this.careers.push({
            id: "example_did3",
            ...{
                department: "마케팅부서",
                position: "팀장",
                salary: 70000,
                join: "20181222",
                leave: "20231222" 
            }
        });
    }

    request_vc(career_vc_request_data: RequestCareerVcDTO): Promise<string>{

        // 1. 홀더 검증 : DID resolver API 호출해서 did docs 얻어오고, 난수(vc_request_data.nonce) 복호화 시도
        // 제이가 만든 리졸버 이용
        // GET /did/{did}
        
        // issuer DB 에서 career 가져오기
        const career = this.careers.find((career) => career.id === career_vc_request_data.holder_did)
        if (!career) {
            throw new NotFoundException(); //안에 message 가능
          }

        // 2. VC 생성 
        const vc_claims = this._create_vc_claims(career)

        const new_vc_did = "VC 의 id 인 did"  // POST /did/{did}
        const new_vc = this.jwtService.create_vc_jwt(vc_claims, new_vc_did, this.issuer.id, career_vc_request_data.holder_did)
        
        return new_vc
    }

    _create_vc_claims(career: Career): Claims{
        //VC 생성 (추후 sd-jwt : issuer 의 pirvate_key 이용)
        // POST /did/{did}?
        const claims = new Claims({
            department: career.department,
            position: career.position,
            join: career.join,
            leave: career.leave
        });

        return claims;
    }

}
