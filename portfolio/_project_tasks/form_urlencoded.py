"""Helper module to retrieve POST data in x-www-form-urlencoded format.

Usage:
    class RequestHandler(BaseHTTPRequestHandler):
        def do_POST(self):
            data = form_urlencoded.get_POST_data(self)
"""

from urllib.parse import parse_qs


def get_POST_data(request):
    """Return the request's application/x-www-form-urlencoded data.

    Args:
        request (BaseHTTPRequestHandler): request handler instance.

    Returns:
        A dictionary containing the POST form data from the request.
        E.g., given a request with "name=Buy+milk&due=2017-06-01",
        {'name': 'Buy milk', 'due': '2017-06-01'} is returned.
    """
    content_length = int(request.headers["content-length"])
    query_string = request.rfile.read(content_length)
    data_bytes = parse_qs(query_string)
    data_str = _decode_data(data_bytes)
    return data_str


def _decode_data(data):
    """Decode bytes dictionary to string.

    Given a dictionary with keys and values as bytes, return
    the same dictionary but with keys and values as string.

    Args:
        data (dict[bytes, bytes]): dictionary returned from
            parse_qs to decode.

    Returns:
        A dictionary with keys and values as string.
    """
    decoded_data = {}
    for key, value in data.items():
        value = value[0]  # values returned by parse_qs are lists
        decoded_data[key.decode()] = value.decode()

    return decoded_data
