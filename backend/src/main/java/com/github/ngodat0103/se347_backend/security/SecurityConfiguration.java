package com.github.ngodat0103.se347_backend.security;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.gen.RSAKeyGenerator;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.HttpStatusServerEntryPoint;
import org.springframework.security.web.server.authorization.HttpStatusServerAccessDeniedHandler;

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfiguration {
  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  @Profile("local-dev")
  SecurityWebFilterChain httpSecurity(ServerHttpSecurity http) {
    http.csrf(ServerHttpSecurity.CsrfSpec::disable);
    http.cors(ServerHttpSecurity.CorsSpec::disable);
    http.authorizeExchange(exchange -> exchange.anyExchange().permitAll());
    http.oauth2ResourceServer(
        resource -> {
          resource.jwt(Customizer.withDefaults());
        });
    http.exceptionHandling(
        exceptionhandlingSpec -> {
          exceptionhandlingSpec.authenticationEntryPoint(
              new HttpStatusServerEntryPoint(HttpStatus.UNAUTHORIZED));
          exceptionhandlingSpec.accessDeniedHandler(
              new HttpStatusServerAccessDeniedHandler(HttpStatus.FORBIDDEN));
        });
    return http.build();
  }

  @Bean
  RSAKey rsaKey() throws JOSEException {
    RSAKeyGenerator rsaKeyGenerator = new RSAKeyGenerator(4096);
    return rsaKeyGenerator.generate();
  }

  @Bean
  JwtEncoder jwtEncoder(JWK jwk) {
    JWKSet jwkSet = new JWKSet(jwk);
    ImmutableJWKSet<SecurityContext> immutableJWKSet = new ImmutableJWKSet<>(jwkSet);
    return new NimbusJwtEncoder(immutableJWKSet);
  }

  @Bean
  ReactiveJwtDecoder reactiveJwtDecoder(JWK jwk) throws JOSEException {
    if (jwk instanceof RSAKey rsaKey) {
      return new NimbusReactiveJwtDecoder(rsaKey.toRSAPublicKey());
    }
    throw new IllegalArgumentException(
        "JWK is not an RSA key,Currently only RSA keys are supported, the key provided is of type: "
            + jwk.getKeyType());
  }
}
