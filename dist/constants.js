"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = require("fs");
const mkdirp_1 = require("mkdirp");
const lodash_1 = require("lodash");
const applicationConfigPath = require("application-config-path");
const eol_1 = tslib_1.__importDefault(require("eol"));
const utils_1 = require("./utils");
// Platform shortcuts
exports.isMac = process.platform === 'darwin';
exports.isLinux = process.platform === 'linux';
exports.isWindows = process.platform === 'win32';
// Common paths
exports.configDir = applicationConfigPath('devcert');
exports.configPath = path_1.default.join.bind(path_1.default, exports.configDir);
exports.domainsDir = exports.configPath('domains');
exports.pathForDomain = path_1.default.join.bind(path_1.default, exports.domainsDir);
exports.caVersionFile = exports.configPath('devcert-ca-version');
exports.opensslSerialFilePath = exports.configPath('certificate-authority', 'serial');
exports.opensslDatabaseFilePath = exports.configPath('certificate-authority', 'index.txt');
exports.caSelfSignConfig = path_1.default.join(__dirname, '../openssl-configurations/certificate-authority-self-signing.conf');
function withDomainSigningRequestConfig(domain, cb) {
    let tmpFile = utils_1.mktmp();
    let source = fs_1.readFileSync(path_1.default.join(__dirname, '../openssl-configurations/domain-certificate-signing-requests.conf'), 'utf-8');
    let template = lodash_1.template(source);
    let result = template({ domain });
    fs_1.writeFileSync(tmpFile, eol_1.default.auto(result));
    cb(tmpFile);
    fs_1.unlinkSync(tmpFile);
}
exports.withDomainSigningRequestConfig = withDomainSigningRequestConfig;
function withDomainCertificateConfig(domain, cb) {
    let tmpFile = utils_1.mktmp();
    let source = fs_1.readFileSync(path_1.default.join(__dirname, '../openssl-configurations/domain-certificates.conf'), 'utf-8');
    let template = lodash_1.template(source);
    let result = template({
        domain,
        serialFile: exports.opensslSerialFilePath,
        databaseFile: exports.opensslDatabaseFilePath,
        domainDir: exports.pathForDomain(domain)
    });
    fs_1.writeFileSync(tmpFile, eol_1.default.auto(result));
    cb(tmpFile);
    fs_1.unlinkSync(tmpFile);
}
exports.withDomainCertificateConfig = withDomainCertificateConfig;
// confTemplate = confTemplate.replace(/DATABASE_PATH/, configPath('index.txt').replace(/\\/g, '\\\\'));
// confTemplate = confTemplate.replace(/SERIAL_PATH/, configPath('serial').replace(/\\/g, '\\\\'));
// confTemplate = eol.auto(confTemplate);
exports.rootCADir = exports.configPath('certificate-authority');
exports.rootCAKeyPath = exports.configPath('certificate-authority', 'private-key.key');
exports.rootCACertPath = exports.configPath('certificate-authority', 'certificate.cert');
mkdirp_1.sync(exports.configDir);
mkdirp_1.sync(exports.domainsDir);
mkdirp_1.sync(exports.rootCADir);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qb25hdGhhbnBhcmsvc3JjL2RldmNlcnQvIiwic291cmNlcyI6WyJjb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0RBQXdCO0FBQ3hCLDJCQUE0RjtBQUM1RixtQ0FBd0M7QUFDeEMsbUNBQWtEO0FBQ2xELGlFQUFrRTtBQUNsRSxzREFBc0I7QUFDdEIsbUNBQWdDO0FBRWhDLHFCQUFxQjtBQUNSLFFBQUEsS0FBSyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDO0FBQ3RDLFFBQUEsT0FBTyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDO0FBQ3ZDLFFBQUEsU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDO0FBRXRELGVBQWU7QUFDRixRQUFBLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QyxRQUFBLFVBQVUsR0FBMEMsY0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBSSxFQUFFLGlCQUFTLENBQUMsQ0FBQztBQUVwRixRQUFBLFVBQVUsR0FBRyxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLFFBQUEsYUFBYSxHQUEwRCxjQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFJLEVBQUUsa0JBQVUsQ0FBQyxDQUFBO0FBRXZHLFFBQUEsYUFBYSxHQUFHLGtCQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNqRCxRQUFBLHFCQUFxQixHQUFHLGtCQUFVLENBQUMsdUJBQXVCLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdEUsUUFBQSx1QkFBdUIsR0FBRyxrQkFBVSxDQUFDLHVCQUF1QixFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzNFLFFBQUEsZ0JBQWdCLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsbUVBQW1FLENBQUMsQ0FBQztBQUUxSCx3Q0FBK0MsTUFBYyxFQUFFLEVBQThCO0lBQzNGLElBQUksT0FBTyxHQUFHLGFBQUssRUFBRSxDQUFDO0lBQ3RCLElBQUksTUFBTSxHQUFHLGlCQUFRLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsb0VBQW9FLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzSCxJQUFJLFFBQVEsR0FBRyxpQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbEMsa0JBQVMsQ0FBQyxPQUFPLEVBQUUsYUFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNaLGVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNkLENBQUM7QUFSRCx3RUFRQztBQUVELHFDQUE0QyxNQUFjLEVBQUUsRUFBOEI7SUFDeEYsSUFBSSxPQUFPLEdBQUcsYUFBSyxFQUFFLENBQUM7SUFDdEIsSUFBSSxNQUFNLEdBQUcsaUJBQVEsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxvREFBb0QsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNHLElBQUksUUFBUSxHQUFHLGlCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3BCLE1BQU07UUFDTixVQUFVLEVBQUUsNkJBQXFCO1FBQ2pDLFlBQVksRUFBRSwrQkFBdUI7UUFDckMsU0FBUyxFQUFFLHFCQUFhLENBQUMsTUFBTSxDQUFDO0tBQ2pDLENBQUMsQ0FBQztJQUNILGtCQUFTLENBQUMsT0FBTyxFQUFFLGFBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNyQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDWixlQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDZCxDQUFDO0FBYkQsa0VBYUM7QUFFQyx3R0FBd0c7QUFDeEcsbUdBQW1HO0FBQ25HLHlDQUF5QztBQUU5QixRQUFBLFNBQVMsR0FBRyxrQkFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDaEQsUUFBQSxhQUFhLEdBQUcsa0JBQVUsQ0FBQyx1QkFBdUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3ZFLFFBQUEsY0FBYyxHQUFHLGtCQUFVLENBQUMsdUJBQXVCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUV0RixhQUFNLENBQUMsaUJBQVMsQ0FBQyxDQUFDO0FBQ2xCLGFBQU0sQ0FBQyxrQkFBVSxDQUFDLENBQUM7QUFDbkIsYUFBTSxDQUFDLGlCQUFTLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgdW5saW5rU3luYyBhcyBybSwgd3JpdGVGaWxlU3luYyBhcyB3cml0ZUZpbGUsIHJlYWRGaWxlU3luYyBhcyByZWFkRmlsZSB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IHN5bmMgYXMgbWtkaXJwIH0gZnJvbSAnbWtkaXJwJztcbmltcG9ydCB7IHRlbXBsYXRlIGFzIG1ha2VUZW1wbGF0ZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgYXBwbGljYXRpb25Db25maWdQYXRoID0gcmVxdWlyZSgnYXBwbGljYXRpb24tY29uZmlnLXBhdGgnKTtcbmltcG9ydCBlb2wgZnJvbSAnZW9sJztcbmltcG9ydCB7IG1rdG1wIH0gZnJvbSAnLi91dGlscyc7XG5cbi8vIFBsYXRmb3JtIHNob3J0Y3V0c1xuZXhwb3J0IGNvbnN0IGlzTWFjID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2Rhcndpbic7XG5leHBvcnQgY29uc3QgaXNMaW51eCA9IHByb2Nlc3MucGxhdGZvcm0gPT09ICdsaW51eCc7XG5leHBvcnQgY29uc3QgaXNXaW5kb3dzID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcblxuLy8gQ29tbW9uIHBhdGhzXG5leHBvcnQgY29uc3QgY29uZmlnRGlyID0gYXBwbGljYXRpb25Db25maWdQYXRoKCdkZXZjZXJ0Jyk7XG5leHBvcnQgY29uc3QgY29uZmlnUGF0aDogKC4uLnBhdGhTZWdtZW50czogc3RyaW5nW10pID0+IHN0cmluZyA9IHBhdGguam9pbi5iaW5kKHBhdGgsIGNvbmZpZ0Rpcik7XG5cbmV4cG9ydCBjb25zdCBkb21haW5zRGlyID0gY29uZmlnUGF0aCgnZG9tYWlucycpO1xuZXhwb3J0IGNvbnN0IHBhdGhGb3JEb21haW46IChkb21haW46IHN0cmluZywgLi4ucGF0aFNlZ21lbnRzOiBzdHJpbmdbXSkgPT4gc3RyaW5nID0gcGF0aC5qb2luLmJpbmQocGF0aCwgZG9tYWluc0RpcilcblxuZXhwb3J0IGNvbnN0IGNhVmVyc2lvbkZpbGUgPSBjb25maWdQYXRoKCdkZXZjZXJ0LWNhLXZlcnNpb24nKTtcbmV4cG9ydCBjb25zdCBvcGVuc3NsU2VyaWFsRmlsZVBhdGggPSBjb25maWdQYXRoKCdjZXJ0aWZpY2F0ZS1hdXRob3JpdHknLCAnc2VyaWFsJyk7XG5leHBvcnQgY29uc3Qgb3BlbnNzbERhdGFiYXNlRmlsZVBhdGggPSBjb25maWdQYXRoKCdjZXJ0aWZpY2F0ZS1hdXRob3JpdHknLCAnaW5kZXgudHh0Jyk7XG5leHBvcnQgY29uc3QgY2FTZWxmU2lnbkNvbmZpZyA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9vcGVuc3NsLWNvbmZpZ3VyYXRpb25zL2NlcnRpZmljYXRlLWF1dGhvcml0eS1zZWxmLXNpZ25pbmcuY29uZicpO1xuXG5leHBvcnQgZnVuY3Rpb24gd2l0aERvbWFpblNpZ25pbmdSZXF1ZXN0Q29uZmlnKGRvbWFpbjogc3RyaW5nLCBjYjogKGZpbGVwYXRoOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgbGV0IHRtcEZpbGUgPSBta3RtcCgpO1xuICBsZXQgc291cmNlID0gcmVhZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL29wZW5zc2wtY29uZmlndXJhdGlvbnMvZG9tYWluLWNlcnRpZmljYXRlLXNpZ25pbmctcmVxdWVzdHMuY29uZicpLCAndXRmLTgnKTtcbiAgbGV0IHRlbXBsYXRlID0gbWFrZVRlbXBsYXRlKHNvdXJjZSk7XG4gIGxldCByZXN1bHQgPSB0ZW1wbGF0ZSh7IGRvbWFpbiB9KTtcbiAgd3JpdGVGaWxlKHRtcEZpbGUsIGVvbC5hdXRvKHJlc3VsdCkpO1xuICBjYih0bXBGaWxlKTtcbiAgcm0odG1wRmlsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aXRoRG9tYWluQ2VydGlmaWNhdGVDb25maWcoZG9tYWluOiBzdHJpbmcsIGNiOiAoZmlsZXBhdGg6IHN0cmluZykgPT4gdm9pZCkge1xuICBsZXQgdG1wRmlsZSA9IG1rdG1wKCk7XG4gIGxldCBzb3VyY2UgPSByZWFkRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vb3BlbnNzbC1jb25maWd1cmF0aW9ucy9kb21haW4tY2VydGlmaWNhdGVzLmNvbmYnKSwgJ3V0Zi04Jyk7XG4gIGxldCB0ZW1wbGF0ZSA9IG1ha2VUZW1wbGF0ZShzb3VyY2UpO1xuICBsZXQgcmVzdWx0ID0gdGVtcGxhdGUoe1xuICAgIGRvbWFpbixcbiAgICBzZXJpYWxGaWxlOiBvcGVuc3NsU2VyaWFsRmlsZVBhdGgsXG4gICAgZGF0YWJhc2VGaWxlOiBvcGVuc3NsRGF0YWJhc2VGaWxlUGF0aCxcbiAgICBkb21haW5EaXI6IHBhdGhGb3JEb21haW4oZG9tYWluKVxuICB9KTtcbiAgd3JpdGVGaWxlKHRtcEZpbGUsIGVvbC5hdXRvKHJlc3VsdCkpO1xuICBjYih0bXBGaWxlKTtcbiAgcm0odG1wRmlsZSk7XG59XG5cbiAgLy8gY29uZlRlbXBsYXRlID0gY29uZlRlbXBsYXRlLnJlcGxhY2UoL0RBVEFCQVNFX1BBVEgvLCBjb25maWdQYXRoKCdpbmRleC50eHQnKS5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpKTtcbiAgLy8gY29uZlRlbXBsYXRlID0gY29uZlRlbXBsYXRlLnJlcGxhY2UoL1NFUklBTF9QQVRILywgY29uZmlnUGF0aCgnc2VyaWFsJykucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKSk7XG4gIC8vIGNvbmZUZW1wbGF0ZSA9IGVvbC5hdXRvKGNvbmZUZW1wbGF0ZSk7XG5cbmV4cG9ydCBjb25zdCByb290Q0FEaXIgPSBjb25maWdQYXRoKCdjZXJ0aWZpY2F0ZS1hdXRob3JpdHknKTtcbmV4cG9ydCBjb25zdCByb290Q0FLZXlQYXRoID0gY29uZmlnUGF0aCgnY2VydGlmaWNhdGUtYXV0aG9yaXR5JywgJ3ByaXZhdGUta2V5LmtleScpO1xuZXhwb3J0IGNvbnN0IHJvb3RDQUNlcnRQYXRoID0gY29uZmlnUGF0aCgnY2VydGlmaWNhdGUtYXV0aG9yaXR5JywgJ2NlcnRpZmljYXRlLmNlcnQnKTtcblxubWtkaXJwKGNvbmZpZ0Rpcik7XG5ta2RpcnAoZG9tYWluc0Rpcik7XG5ta2RpcnAocm9vdENBRGlyKTtcbiJdfQ==