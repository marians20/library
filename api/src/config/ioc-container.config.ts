import { Container } from 'typescript-ioc';
import { IPeopleRepository, PeopleRepository } from '../infra/repositories';


export class IocContainerConfig {

    static configure() {
        Container.bind(IPeopleRepository).to(PeopleRepository);
    }
}