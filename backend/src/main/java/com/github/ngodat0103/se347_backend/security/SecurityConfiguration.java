package com.github.ngodat0103.se347_backend.security;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.gen.RSAKeyGenerator;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {
  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  @Profile("local-dev")
  SecurityFilterChain httpSecurity(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable);
    http.cors(
        cors -> {
          UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
          CorsConfiguration corsConfiguration = new CorsConfiguration();
            corsConfiguration.addAllowedOrigin("http://localhost:4200");
            corsConfiguration.addAllowedHeader("*");
            corsConfiguration.addAllowedMethod("*");
            source.registerCorsConfiguration("/**", corsConfiguration);
          cors.configurationSource(source);
        });
    http.authorizeHttpRequests(req -> req.anyRequest().permitAll());
//    http.oauth2ResourceServer(
//        resource -> {
//          resource.jwt(Customizer.withDefaults());
//        });
    http.exceptionHandling(
        exceptionhandlingSpec -> {
          exceptionhandlingSpec.authenticationEntryPoint(
              new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
          exceptionhandlingSpec.accessDeniedHandler(
              new AccessDeniedHandlerImpl());
        });


    http.anonymous(anonymousSpec -> anonymousSpec.principal("6729eab6fc8989612b718e44"));
    return http.build();
  }

  @Bean
  @ConditionalOnMissingBean
  RSAKey rsaKeyAutoGenerate() throws JOSEException {
    RSAKeyGenerator rsaKeyGenerator = new RSAKeyGenerator(4096);
    return rsaKeyGenerator.generate();
  }

  //  @Bean
  //  @ConditionalOnProperty(name = "jwk.rsa.key-value")
  //  RSAKey rsaKey(String keyValue) throws JOSEException {
  //     RSAKey rsaKey = RSAKey.parse()
  //  }

  @Bean
  JwtEncoder jwtEncoder(JWK jwk) {
    JWKSet jwkSet = new JWKSet(jwk);
    ImmutableJWKSet<SecurityContext> immutableJWKSet = new ImmutableJWKSet<>(jwkSet);
    return new NimbusJwtEncoder(immutableJWKSet);
  }

//  @Bean
//  JwtDecoder passwordEncoder(JWK jwk) throws JOSEException {
//    if (jwk instanceof RSAKey rsaKey) {
//      return new NimbusJwtDecoder(rsaKey.toRSAPublicKey());
//    }
//    throw new IllegalArgumentException(
//        "JWK is not an RSA key,Currently only RSA keys are supported, the key provided is of type: "
//            + jwk.getKeyType());
//  }
}
