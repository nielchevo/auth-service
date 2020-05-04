import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(UserAuthEntity) private readonly userAuthRepository: Repository<UserAuthEntity>,
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    private readonly jwtservice: JwtService,
  ) {}

  async verifyToken(token: string): Promise<any> {
    const result = await this.jwtservice
      .verifyAsync(token, { ignoreExpiration: false })
      .then(res => {
        return res;
      })
      .catch(err => {
        throw new HttpException(err, 401);
      });

    return result;
  }

  async UserLogin(npp_id: string, password: string): Promise<object> {
    try {
      // validate npp and password into HRIS database
      // hash to md5 for searching consistency with HRIS data
      const encryptedPassword = createHash('md5')
        .update(password)
        .digest('hex');

      const HRIS_URL_SERVICE: string =
        this.config.get<string>('HRIS_BASE_URL') + '/users/login';

      const {
        data: { data },
      } = await this.httpService
        .get(HRIS_URL_SERVICE, {
          params: {
            npp_id: npp_id,
            password: encryptedPassword,
          },
        })
        .toPromise();

      const payload = {
        npp: data.users.npp,
        name: data.users.nama,
        groupAkses: data.users.groupAkses,
        kodeUnit: data.users.kodeUnit,
        kodeLokasiUnit: data.users.kodeLokasiUnit,
        kodeJabatan: data.users.kodeJabatan,
        kodeEselon: data.users.kodeEselon,
        kodeJenisJabatan: data.users.kodeJenisJabatan,
        accessRights: [
          { id: 1, name: 'KPI', access: true },
          { id: 2, name: 'Eproc', access: false },
          { id: 3, name: 'Other', access: false },
        ],
      };

      const response = {
        token: this.jwtservice.sign(payload),
        ...payload,
      };

      return response;
    } catch (error) {
      throw new HttpException(
        (error.response && error.response.data.message) || error.message,
        400,
      );
    }
  }
}
