package com.github.ngodat0103.javabackup;

import com.github.ngodat0103.javabackup.exception.ConflictException;
import org.slf4j.Logger;

public final class Util {
  private static final String TEMPLATE_NOT_FOUND = "%s with %s: %s not found";
  private static final String TEMPLATE_CONFLICT = "%s with %s: %s already exists";

  public Util() {
    throw new IllegalStateException("Utility class");
  }

  public static Throwable throwConflictException(
      Logger log, String entity, String attributeName, Object attributeValues) {
    String message = String.format(TEMPLATE_CONFLICT, entity, attributeName, attributeValues);
    ConflictException conflictException = new ConflictException(message);
    logging(log, message, conflictException);
    throw conflictException;
  }

  private static void logging(Logger log, String message, Exception exception) {
    if (log.isTraceEnabled()) {
      log.debug(message, exception);
    } else if (log.isDebugEnabled()) {
      log.debug(message);
    }
  }
}
