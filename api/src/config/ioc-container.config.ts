import { Container } from "typescript-ioc";
import { IPeopleRepository, PeopleRepository } from "../repositories";

export class IocContainerConfig {

    static configure() {
        Container.bind(IPeopleRepository).to(PeopleRepository);
    }
}