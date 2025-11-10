import * as moment from "moment";

declare module "moment-jalaali" {
  function moment(
    inp?: moment.MomentInput,
    format?: moment.MomentFormatSpecification,
    strict?: boolean
  ): moment.Moment;
  function moment(
    inp?: moment.MomentInput,
    format?: moment.MomentFormatSpecification,
    language?: string,
    strict?: boolean
  ): moment.Moment;
  namespace moment {
    interface Locale {
      (
        inp?: moment.MomentInput,
        format?: moment.MomentFormatSpecification,
        strict?: boolean
      ): moment.Moment;
    }
  }
  export = moment;
}
