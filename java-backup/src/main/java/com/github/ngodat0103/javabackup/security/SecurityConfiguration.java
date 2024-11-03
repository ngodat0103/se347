package com.github.ngodat0103.javabackup.security;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.gen.RSAKeyGenerator;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
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
    return http.build();
  }

  @Bean
  JwtEncoder jwtEncoder() throws JOSEException {
    RSAKeyGenerator rsaKeyGenerator = new RSAKeyGenerator(2048);
    JWK jwk = rsaKeyGenerator.generate();
    List<JWK> jwkList = List.of(jwk);
    JWKSource<SecurityContext> jwkSource = new ImmutableJWKSet<>(new JWKSet(jwkList));
    return new NimbusJwtEncoder(jwkSource);
  }
}
