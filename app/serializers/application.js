import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalize(modelClass, resourseHash, id) {
    let data = {
      id,
      type: modelClass.modelName,
      attributes: resourseHash
    }

    return { data }
  },

  normalizeArrayResponse(store, primaryModelClass, payload) {
    let normalizedData = payload.results.map((record) => {
      let urlArr = record.url.split('/'); // use modelName instead if poss
      let id = urlArr[urlArr.length - 2];
      let data = this.normalize(primaryModelClass, record, id);

      return { data };
    });

    return {
      data: normalizedData
    };
  },

  normalizeSingleResponse(store, primaryModelClass, payload, id) {
    return this.normalize(primaryModelClass, payload, id);
  }
});
