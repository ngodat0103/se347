package com.github.ngodat0103.usersvc.exception;

import org.slf4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;

public final class Util {
  private static final String TEMPLATE_NOT_FOUND = "%s with %s: %s not found";
  private static final String TEMPLATE_CONFLICT = "%s with %s: %s already exists";

  private Util() {
    throw new IllegalStateException("Utility class");
  }

  public static String getUserIdfromAuthentication() {
    return SecurityContextHolder.getContext().getAuthentication().getName();
  }

  public static ConflictException createConflictException(
      Logger log, String entity, String attributeName, Object attributeValues) {
    String message = String.format(TEMPLATE_CONFLICT, entity, attributeName, attributeValues);
    ConflictException conflictException = new ConflictException(message);
    logging(log, message, conflictException);
    throw conflictException;
  }

  public static NotFoundException createNotFoundException(
      Logger log, String entity, String attributeName, Object attributeValues) {
    String message = String.format(TEMPLATE_NOT_FOUND, entity, attributeName, attributeValues);
    logging(log, message, null);
    throw new NotFoundException(message);
  }

  private static void logging(Logger log, String message, Exception exception) {
    if (log.isTraceEnabled()) {
      log.debug(message, exception);
    } else if (log.isDebugEnabled()) {
      log.debug(message);
    }
  }
}
